<?php
    $pathImage = count($school->images) != 0 ? asset("storage/".$school->images()->first()->path) : asset('images/school_default_cover.jpg')
?>
<div class="card" style="width: 18rem;">
    <img src="{{$pathImage}}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title"><a href="{{route('school.show',compact('school'))}}">{{$school->title}}</a></h5>
        <p class="card-text">{{$school->description}}</p>
        <a href="{{route('school.show',compact('school'))}}" class="btn btn-primary">{{__('other.Go over')}}</a>
    </div>
</div>
