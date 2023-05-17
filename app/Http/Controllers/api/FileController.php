<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function storeImages(Request $request, $modelType, $model, $fileType)
    {
        self::storeFile($request, $modelType, $model, $fileType);
        session()->flash('success', __('other.Files uploaded successfully'));
    }

    public function storeFiles(Request $request, $modelType, $model, $fileType)
    {
        self::storeFile($request, $modelType, $model, $fileType);
        session()->flash('success', __('other.Files uploaded successfully'));
    }

    static function storeFile(Request $request, $modelType, $modelId, $fileType, $key = "images")
    {
        foreach ($request->file($key) as $file) {
            $upload_folder = $modelType.'/'.$modelId.'/'.$fileType;
            $upload_file = $file->store($upload_folder, 'public');
            $mas = explode('/', $upload_file);
            $name = end($mas);

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
        }
    }

    public function deleteFilesThroughCheckBox(Request $request)
    {
        try {
            if ($request->checkbox) {
                $checkboxes = explode(',', $request->checkbox);
                foreach ($checkboxes as $file_id) {
                    $this->deleteFile($file_id);
                }
            } else {
                session()->flash('warning', __('other.No file selected'));
                return redirect()->back();
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
        session()->flash('success', __('other.Files successfully deleted'));
    }

    static function deleteFile($file_id)
    {
        try {
            $file = File::find($file_id);
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
                session()->flash('success', __('other.The file was successfully deleted'));
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
            \App\Http\Controllers\FileController::deleteFile($file->id);
            $file->delete();
            if (count($request->images) != 0) {
                FileController::storeFile($request, $file->model_type, $file->model_id, $file->type);
                session()->flash('success', __('other.The image has been successfully replaced'));
            } else {
                session()->flash('success', __('other.The file was successfully deleted'));
            }
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }
}
