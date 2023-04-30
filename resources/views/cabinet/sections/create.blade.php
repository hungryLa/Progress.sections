@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.sidebar/>
        <div class="col-9">
            <x-common.flash/>
            <form method="POST" action="{{route('section.store',compact('school'))}}" enctype="multipart/form-data">
                @csrf
                <x-form.File name="images[]" title="{{__('form.Gallery')}}" multiple="multiple"/>
                <x-form.inputText name="title" title="{{__('form.Title')}}"
                                  placeholder="{{__('form.Enter the title')}}" value="{{old('title')}}" disabled=""/>
                <x-form.inputText name="description" title="{{__('form.Description')}}"
                                  placeholder="{{__('form.Enter the description')}}" value="{{old('description')}}" disabled=""/>
                <x-form.Textarea name="contents" value="{{old('contents')}}" title="{{__('form.Contents')}}"
                                                placeholder="{{__('form.Enter the contents')}}" disabled=""/>
                <button class="btn btn-success">{{__('other.Add a record')}}</button>
            </form>
        </div>
    </div>
@endsection
