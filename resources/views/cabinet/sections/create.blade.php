@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.sidebar/>
        <div class="col-9">
            <x-common.flash/>
            <form method="POST" action="{{route('section.store',compact('school'))}}" enctype="multipart/form-data">
                @csrf
                <x-form.File name="images[]" title="{{__('form.Gallery')}}" multiple="multiple"/>
                <x-form.Select name="occupation_id" label="{{__('other.Type of occupations')}}" default-value="{{__('other.Choose the type of activity')}}" disabled="">
                    @foreach($occupations as $occupation)
                        <option value="{{$occupation->id}}" {{$occupation->id == old('occupation_id') ? 'selected' : ''}}>{{$occupation->title}}</option>
                    @endforeach
                </x-form.Select>
                <x-form.inputText name="description" title="{{__('form.Description')}}"
                                  placeholder="{{__('form.Enter the description')}}" value="{{old('description')}}" disabled=""/>
                <x-form.Textarea name="contents" value="{{old('contents')}}" title="{{__('form.Contents')}}"
                                                placeholder="{{__('form.Enter the contents')}}" disabled=""/>
                <button class="btn btn-success">{{__('other.Add a record')}}</button>
            </form>
        </div>
    </div>
@endsection
