<?php
    $pathImage = count($school->images) != 0 ? asset("storage/".$school->images()->first()->path) : asset('images/school_default_cover.jpg')
?>
<div class="card" style="width: 18rem;">
    <img src="{{$pathImage}}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title"><a href="{{route('school.show',compact('school'))}}">{{$school->title}}</a></h5>
        <p class="card-text">{{$school->description}}</p>
        <div class="row">
            <div class="col">
                <a href="{{route('school.show',compact('school'))}}" class="btn btn-primary">{{__('other.Go over')}}</a>
            </div>
            <div class="col">
                @if(Auth::user()->hasRole(\App\Models\User::ROLES['teacher']) && $school->recruitment_open)
                    <?php
                    $teacher = Auth::user()->getTeacher();
                    $communication = $teacher->communications()
                        ->where(['school_id' => $school->id])->first();
                    ?>
                    @if(!$communication)
                        <form method="POST" action="{{route('communications.school.submit_application',compact('school'))}}">
                            @csrf
                            <button class="btn btn-primary">{{__('other.Submit an application')}}</button>
                        </form>
                    @elseif($communication->type == \App\Models\Communication::TYPES['job request'])
                        <form method="POST" action="{{route('communications.school.cancel_application',compact('school'))}}">
                            @csrf
                            @method('delete')
                            <button class="btn btn-danger">{{__('other.Cancel the application')}}</button>
                        </form>
                    @endif
                @endif
            </div>
        </div>

    </div>
</div>
