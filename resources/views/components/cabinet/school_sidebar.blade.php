<div class="col-3">
    <ul class="list-group">
        @if(\Illuminate\Support\Facades\Auth::user()->hasRole(\App\Models\User::ROLES['schools_owner']))
            <li class="list-group-item"><a href="">{{__('other.Reservations')}}</a></li>
            <li class="list-group-item"><a href="{{route('timetables.index',compact('school'))}}">{{__('other.Timetables')}}</a></li>
            <li class="list-group-item"><a href="{{route('section.index',compact('school'))}}">{{__('other.Sections')}}</a></li>
            <li class="list-group-item"><a href="{{route('teacher.index',compact('school'))}}">{{__('other.Teachers')}}</a></li>
            <li class="list-group-item"><a href="{{route('communications.application.index',compact('school'))}}">{{__('other.Applications')}}</a></li>
            <li class="list-group-item"><a href="{{route('school.subscription.index',compact('school'))}}">{{__('other.Subscriptions')}}</a></li>
            <li class="list-group-item"><a href="{{route('school.edit',compact('school'))}}">{{__('other.Edit')}}</a></li>
        @endif
            <li class="list-group-item"><a href="{{route('section.index',compact('school'))}}">{{__('other.Sections')}}</a></li>
        <li class="list-group-item"><a href="{{route('school.subscription.index',compact('school'))}}">{{__('other.Subscriptions')}}</a></li>
        <li class="list-group-item"><a href="{{route('school.index')}}">{{__('other.Go back')}}</a></li>
    </ul>
</div>
