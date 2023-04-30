<div class="col-3">
    @if(\Illuminate\Support\Facades\Auth::user()->hasRole(\App\Models\User::ROLES['admin']))
        <a href="{{route('cabinet.user.index')}}">{{__('other.List of users')}}</a>
        <a href="{{route('cabinet.occupations.index')}}">{{__('other.Types of classes')}}</a>
    @elseif(\Illuminate\Support\Facades\Auth::user()->hasRole(\App\Models\User::ROLES['schools_owner']))
        <a href="{{route('school.index')}}">{{__('other.Schools')}}</a>
    @elseif(\Illuminate\Support\Facades\Auth::user()->hasRole(\App\Models\User::ROLES['teacher']))
        <a href="{{route('school.index')}}">{{__('other.Schools')}}</a>
        <a href="{{route('invitations.index')}}">{{__('other.Invitations')}}</a>
    @elseif(\Illuminate\Support\Facades\Auth::user()->hasRole(\App\Models\User::ROLES['user']))
        <a href="{{route('cabinet.people.index')}}">{{__('other.People')}}</a>
    @endif
    <a href="{{route('cabinet.user.settings',['user'=> Auth::user()])}}">{{__('other.Settings')}}</a>
    <form method="POST" action="{{route('logout')}}">
        @csrf
        <button class="btn">{{__('other.Logout')}}</button>
    </form>
</div>
