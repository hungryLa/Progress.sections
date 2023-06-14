@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <div class="col-3">

            @if(\Illuminate\Support\Facades\Auth::user()->hasRole(\App\Models\User::ROLES['schools_owner']))
                <a href="">{{__('other.Reservations')}}</a>
                <a href="">{{__('other.Schedules')}}</a>
                <a href="{{route('school.edit',compact('school'))}}">{{__('other.Edit')}}</a>
            @endif
            <a href="{{route('school.index')}}">{{__('other.Go back')}}</a>
        </div>
        <div class="col-9">
            <x-common.flash/>
            <div class="mb-3 border-bottom border-top border-1 pt-3 pb-3">
                <h2>{{__('form.Gallery')}}</h2>
                <x-form.FormStoreFiles name="files[]" label="{{__('other.Add image')}}"
                                       action="{{route('cabinet.files.storeImages',['modelType' => \App\Models\School::TYPE, 'model' => $school, 'fileType' => \App\Models\File::TYPE['image']])}}" multiple="multiple"/>
                @if(count($images) !=0)
                    <x-form.FormDeleteImages :images="$images"/>
                @endif
            </div>
            <h2>{{__('other.Information')}}</h2>
            <form method="POST" action="{{route('school.update',compact('school'))}}">
                @csrf
                @method('PUT')
                <x-form.Select name="status" label="{{__('form.Status')}}" default-value="{{__('form.Select the status')}}" disabled="">
                    @foreach(\App\Models\School::STATUS as $status)
                        <option value="{{$status}}" {{$status == $school->status ? 'selected' : ''}}>{{__('form.'.$status)}}</option>
                    @endforeach
                </x-form.Select>
                <div class="mb-3">
                    <label for="recruitment_open">{{__('other.Recruitment is open')}}</label>
                    <input type="checkbox" id="recruitment_open" name="recruitment_open" {{$school->recruitment_open ? 'checked': ''}}>
                </div>
                <x-form.Select name="type" label="{{__('other.Type of school')}}" default-value="{{__('other.Select type of school')}}" disabled="">
                    @foreach(\App\Models\School::SCHOOL_TYPES as $type)
                        <option value="{{$type}}" {{$type == $school->type ? 'selected' : ''}}>{{__('other.'.$type)}}</option>
                    @endforeach
                </x-form.Select>
                <x-form.inputText name="title" title="{{__('form.Title')}}"
                                  placeholder="{{__('form.Enter the title')}}" value="{{$school->title}}" disabled=""/>
                <x-form.inputText name="description" title="{{__('form.Description')}}"
                                  placeholder="{{__('form.Enter the description')}}" value="{{$school->description}}" disabled=""/>
                <x-form.inputText name="address" title="{{__('form.Address')}}"
                                  placeholder="{{__('form.Enter the address')}}" value="{{$school->address}}" disabled=""/>
                <x-form.inputText name="phone_number" title="{{__('form.Phone number')}}"
                                  placeholder="{{__('form.Enter the phone number')}}" value="{{$school->phone_number}}" disabled=""/>
                <button class="btn btn-warning">{{__('other.Change')}}</button>
            </form>
            <x-form.DeleteButton route="{{route('school.delete',compact('school'))}}"
                                                       name="school_title" value="{{old('school_title')}}"
                                                       title="{{__('form.Title')}}" placeholder="{{__('form.Enter the title')}}" disabled=""/>
        </div>
    </div>
@endsection
