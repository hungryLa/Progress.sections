@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.sidebar/>
        <div class="col-9">
            <x-common.flash/>
            <div class="mb-3 border-bottom border-top border-1 pt-3 pb-3">
                <h2>{{__('form.Gallery')}}</h2>
                <x-form.FormStoreFiles name="files[]" label="{{__('other.Add image')}}"
                                                      action="{{route('cabinet.files.storeImages',['modelType' => \App\Models\Section::TYPE, 'model' => $section, 'fileType' => \App\Models\File::TYPE['image']])}}" multiple=""/>
                @if(count($images) !=0)
                    <x-form.FormDeleteImages :images="$images"/>
                @endif
            </div>

            <form method="POST" action="{{route('cabinet.sections.update',compact('section'))}}" enctype="multipart/form-data">
                @csrf
                @method('PUT')
                <x-form.inputText name="title" title="{{__('form.Title')}}"
                                  placeholder="{{__('form.Enter the title')}}" value="{{$section->title}}" disabled=""/>
                <x-form.inputText name="description" title="{{__('form.Description')}}"
                                  placeholder="{{__('form.Enter the description')}}" value="{{$section->description}}" disabled=""/>
                <x-form.inputText name="address" title="{{__('form.Address')}}"
                                  placeholder="{{__('form.Enter the address')}}" value="{{$section->address}}" disabled=""/>
                <x-form.inputText name="phone_number" title="{{__('form.Phone number')}}"
                                  placeholder="{{__('form.Enter the phone number')}}" value="{{$section->phone_number}}" disabled=""/>
                <button class="btn btn-success">{{__('other.Apply changes')}}</button>
            </form>
        </div>
    </div>
@endsection
