@extends('cabinet.layouts.app')

@section('content')
    <div class="row">
        <x-cabinet.sidebar/>
        <div class="col-9">
            <x-common.flash/>
            <a class="btn btn-success" href="{{route('section.create')}}">{{__('other.Add a record')}}</a>
            @if(count($sections) != 0)
                @foreach($sections as $section)
                    <div class="card" style="width: 18rem;">
                        <img src="{{asset("storage/".$section->images()->first()->path)}}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">{{$section->title}}</h5>
                            <p class="card-text">{{$section->description}}</p>
                            <a href="{{route('cabinet.sections.show',compact('section'))}}" class="btn btn-primary">{{__('other.Go over')}}</a>
                        </div>
                    </div>
                @endforeach
            @endif
        </div>
    </div>
@endsection
