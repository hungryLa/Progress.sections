<?php
$pathImage = count($subscription->images) != 0 ? asset("storage/".$subscription->images()->first()->path) : asset('images/school_default_cover.jpg')
?>
<div class="card" style="width: 18rem;">
    <img src="{{asset($pathImage)}}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">
            <a href="{{route('school.show',compact('school'))}}">{{$subscription->school->title}}</a>
        </h5>
        <h5 class="card-title">{{$subscription->title}}</h5>
        <p class="card-text">{{$subscription->price}} руб.</p>

    </div>
</div>
