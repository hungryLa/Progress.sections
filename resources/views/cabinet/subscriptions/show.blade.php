@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.school_sidebar :school="$school"/>
        <div class="col-9">
            <x-common.flash/>
            <form>
                <x-form.Select name="type" label="{{__('form.Subscription type')}}" default-value="{{__('form.Choose a subscription type')}}" disabled="disabled">
                    @foreach(\App\Models\Subscription::TYPES as $type)
                        <option value="{{$type}}" {{$type == $subscription->type ? 'selected' : ''}}>
                            {{__('form.'.$type)}}
                        </option>
                    @endforeach
                </x-form.Select>
                <x-form.Select name="section_id" label="{{__('other.Sections')}}" default-value="{{__('other.Select a section')}}" disabled="disabled">
                    @foreach($sections as $section)
                        <option value="{{$section->id}}" {{$section->id == $subscription->section_id ? 'selected' : ''}}>
                            {{$section->occupation->title}}
                        </option>
                    @endforeach
                </x-form.Select>
                <x-form.Select name="status" label="{{__('form.Status')}}" default-value="{{__('form.Select the status')}}" disabled="disabled">
                    @foreach(\App\Models\Subscription::STATUS as $status)
                        <option value="{{$status}}" {{$status == $subscription->status ? 'selected' : ''}}>
                            {{__('form.'.$status)}}
                        </option>
                    @endforeach
                </x-form.Select>
                <x-form.inputText name="price" title="{{__('form.Price')}}"
                                  placeholder="{{__('form.Specify the price')}}" value="{{$subscription->price}}" disabled="disabled"/>
                <x-form.inputText name="title" title="{{__('form.Title')}}"
                                  placeholder="{{__('form.Enter the title')}}" value="{{$subscription->title}}" disabled="disabled"/>
                <x-form.inputText name="value" title="{{__('form.Value')}}" value="{{$subscription->value}}" disabled="disabled"
                                  placeholder="{{__('form.Specify the number of classes or the amount of the deposit')}}" />
                <x-form.Textarea name="contents" value="{{$subscription->contents}}" title="{{__('form.Contents')}}"
                                 placeholder="{{__('form.Enter the contents')}}" disabled="disabled"/>
                <a class="btn btn-warning" href="{{route('school.subscription.edit',compact('school','subscription'))}}">{{__('other.Change')}}</a>
            </form>
        </div>
    </div>
@endsection
