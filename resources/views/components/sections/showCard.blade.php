<?php
$pathImage = count($section->images) != 0 ? asset("storage/".$section->images()->first()->path) : asset('images/school_default_cover.jpg')
?>
<div class="card" style="width: 18rem;">
    <img src="{{asset($pathImage)}}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">{{$section->title}}</h5>
        <p class="card-text">{{$section->description}}</p>
        <a href="{{route('section.show',compact('school','section'))}}" class="btn btn-primary">{{__('other.Go over')}}</a>
    </div>
</div>
