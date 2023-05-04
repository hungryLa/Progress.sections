<?php
$pathImage = count($subscription->images) != 0 ? asset("storage/".$subscription->images()->first()->path) : asset('images/school_default_cover.jpg')
?>
<div class="card" style="width: 18rem;">
    <img src="{{asset($pathImage)}}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">{{$subscription->title}}</h5>
        <p class="card-text">{{$subscription->price}} руб.</p>
        <a href="{{route('school.subscription.show',compact('school','subscription'))}}" class="btn btn-primary">{{__('other.Go over')}}</a>
        <form method="POST" action="{{route('payments.storePayment',compact('school','subscription'))}}">
            @csrf
            <button class="btn btn-success">{{__('other.Buy')}}</button>
        </form>
    </div>
</div>
