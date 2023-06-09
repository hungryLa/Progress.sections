<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\File;
use App\Models\General;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class FileController extends Controller
{
    public function storeFiles(Request $request, $modelType, $model, $fileType, $key = "files")
    {
        if ($request->hasFile($key)) {
            $success = self::storeFile($request, $modelType, $model, $fileType);
            if ($success) {
                session()->flash('success', ('other.Files uploaded successfully'));
            } else {
                session()->flash('warning', ('other.The limit of images has been reached, have not been uploaded'));
            }
        } else {
            session()->flash('warning', ('other.No files selected'));
        }
    }

    static function storeFile(Request $request, $modelType, $modelId, $fileType, $key = "files")
    {
        foreach ($request->file($key) as $file) {
            if (self::checkCurrentCountFiles($modelType, $modelId, $fileType)) {
                $upload_folder = $modelType.'/'.$modelId.'/'.$fileType;
                
                // Оригинальное имя файла
                $name = $file->getClientOriginalName();

                // Формат файла
                $format = $file->getClientOriginalExtension();

                if ($format == 'jpg' || $format == 'png') {
                    // Убирается подстрока с форматом файла из названия
                    $name = pathinfo($name, PATHINFO_FILENAME);

                    // Добавляется ".webp" в конец строки
                    $name = Str::finish($name, '.webp');

                    // Создается изображение
                    $img = Image::make($file);

                    // Конвертируется в формат webp
                    $img->encode('webp', 75);

                    // Загрузка на диск
                    Storage::disk('public')->put($upload_folder.'/'.$name, $img);

                    $upload_file = $upload_folder.'/'.$name;
                } else {
                    $upload_file = $file->store($upload_folder, 'public');
                }

                $last_position = File::where([
                    'model_type' => $modelType,
                    'model_id' => $modelId,
                    'type' => $fileType,
                ])->orderBy('position', 'desc')->first();

                if ($last_position) {
                    $position = $last_position->position + 1;
                } else {
                    $position = 1;
                }

                File::create([
                    'model_type' => $modelType,
                    'model_id' => $modelId,
                    'type' => $fileType,
                    'position' => $position,
                    'name' => $name,
                    'original_name' => $file->getClientOriginalName(),
                    'path' => $upload_file ?: null,
                ]);
            } else {
                return false;
            }
        }
        return true;
    }

    public function downlandFile(File $file)
    {
        $path = Storage::disk('public')->path($file->path);
        return response()->download($path, $file->original_name);
    }

    static function checkCurrentCountFiles($name_table, $model_id, $model_file)
    {
        $model = General::model($name_table);
        $instance = $model->find($model_id);
        if ($model_file == File::TYPE['images']) {
            $count_files = count($instance->files()->where('type', File::TYPE['images'])->get());
            if ($count_files < $instance::MAX_FILES['images']) {
                return true;
            } else {
                return false;
            }
        } elseif ($model_file == File::TYPE['documents']) {
            $count_files = count($instance->files()->where('type', File::TYPE['documents'])->get());
            if ($count_files < $instance::MAX_FILES['documents']) {
                return true;
            } else {
                return false;
            }
        }
    }

    public function deleteFilesThroughCheckBox(Request $request)
    {
        try {
            if ($request->checkbox) {
                foreach (explode(',', $request->checkbox) as $file_id) {
                    $file = File::find($file_id);
                    $this->deleteFile($file);
                }
            } else {
                session()->flash('warning', ('other.No file selected'));
                return redirect()->back();
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }

    static function deleteFile(File $file)
    {
        try {
//            dd($file);
            Storage::disk('public')->delete($file->path);
            $files = File::where([
                'model_type' => $file->model_type,
                'model_id' => $file->model_id,
                'type' => $file->type,
            ])->where('position', '>', $file->position)->orderBy('position', 'asc')->get();
            $success = $file->delete();

            foreach ($files as $file) {
                $file->update([
                    'position' => $file->position - 1,
                ]);
            }
            if (count(File::where(['model_type' => $file->model_type, 'model_id' => $file->model_id,])->get()) == 0) {
                $str_search = '/'.$file->type.'/'.$file->name;
                $result = str_replace($str_search, '', $file->path);
                Storage::disk('public')->deleteDirectory($result);
            } elseif (count(
                    File::where(
                        ['model_type' => $file->model_type, 'model_id' => $file->model_id, 'type' => $file->type]
                    )->get()
                ) == 0) {
                $str_search = '/'.$file->name;
                $result = str_replace($str_search, '', $file->path);
                Storage::disk('public')->deleteDirectory($result);
            }
            if ($success) {
                session()->flash('success', ('other.The file was successfully deleted'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }

    public function changeImage(Request $request, $key = 'images')
    {
        try {
            $file = $request->file($key);
            $file = $file[0];
            FileController::deleteFile($file->id);
            $file->delete();
            if (count($request->images) != 0) {
                FileController::storeFile($request, $file->model_type, $file->model_id, $file->type);
                session()->flash('success', ('other.The image has been successfully replaced'));
            } else {
                session()->flash('success', ('other.The file was successfully deleted'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }
}
