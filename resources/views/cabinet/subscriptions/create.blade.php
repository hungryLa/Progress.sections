@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.school_sidebar :school="$school"/>
        <div class="col-9">
            <x-common.flash/>
            <form method="POST" action="{{route('school.subscription.store',compact('school'))}}" enctype="multipart/form-data">
                @csrf
                <x-form.File name="images[]" title="{{__('form.Gallery')}}" multiple=""/>
                <x-form.Select name="type" label="{{__('form.Subscription type')}}" default-value="{{__('form.Choose a subscription type')}}" disabled="">
                    @foreach(\App\Models\Subscription::TYPES as $type)
                        <option value="{{$type}}" {{$type == old('type') ? 'selected' : ''}}>
                            {{__('form.'.$type)}}
                        </option>
                    @endforeach
                </x-form.Select>
                <x-form.Select name="section_id" label="{{__('other.Sections')}}" default-value="{{__('other.Select a section')}}" disabled="">
                    @foreach($sections as $section)
                        <option value="{{$section->id}}" {{$section->id == old('section_id') ? 'selected' : ''}}>
                            {{$section->occupation->title}}
                        </option>
                    @endforeach
                </x-form.Select>
                <x-form.Select name="status" label="{{__('form.Status')}}" default-value="{{__('form.Select the status')}}" disabled="">
                    @foreach(\App\Models\Subscription::STATUS as $status)
                        <option value="{{$status}}" {{$status == old('status') ? 'selected' : ''}}>
                            {{__('form.'.$status)}}
                        </option>
                    @endforeach
                </x-form.Select>
                <x-form.inputText name="price" title="{{__('form.Price')}}"
                                  placeholder="{{__('form.Specify the price')}}" value="{{old('price')}}" disabled=""/>
                <x-form.inputText name="title" title="{{__('form.Title')}}"
                                  placeholder="{{__('form.Enter the title')}}" value="{{old('title')}}" disabled=""/>
                <x-form.inputText name="value" title="{{__('form.Value')}}" value="{{old('value')}}" disabled=""
                                  placeholder="{{__('form.Specify the number of classes or the amount of the deposit')}}" />
                <x-form.Textarea name="contents" value="{{old('contents')}}" title="{{__('form.Contents')}}"
                                 placeholder="{{__('form.Enter the contents')}}" disabled=""/>
                <button class="btn btn-success">{{__('other.Add a record')}}</button>
            </form>
        </div>
    </div>
@endsection
