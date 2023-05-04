<div class="col-3">

    @if(\Illuminate\Support\Facades\Auth::user()->hasRole(\App\Models\User::ROLES['schools_owner']))
        <a href="">{{__('other.Reservations')}}</a>
        <a href="{{route('timetables.index',compact('school'))}}">{{__('other.Timetables')}}</a>
        <a href="{{route('section.index',compact('school'))}}">{{__('other.Sections')}}</a>
        <a href="{{route('teacher.index',compact('school'))}}">{{__('other.Teachers')}}</a>
        <a href="{{route('communications.application.index',compact('school'))}}">{{__('other.Applications')}}</a>
        <a href="{{route('school.edit',compact('school'))}}">{{__('other.Edit')}}</a>
    @endif
    <a href="{{route('school.index')}}">{{__('other.Go back')}}</a>
</div>
