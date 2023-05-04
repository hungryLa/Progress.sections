<div class="col-3">
    <ul class="list-group">
        @if(\Illuminate\Support\Facades\Auth::user()->hasRole(\App\Models\User::ROLES['admin']))
            <li class="list-group-item"><a href="{{route('cabinet.user.index')}}">{{__('other.List of users')}}</a></li>
            <li class="list-group-item"><a href="{{route('cabinet.occupations.index')}}">{{__('other.Types of classes')}}</a></li>
        @elseif(\Illuminate\Support\Facades\Auth::user()->hasRole(\App\Models\User::ROLES['schools_owner']))
            <li class="list-group-item"><a href="{{route('school.index')}}">{{__('other.Schools')}}</a></li>
        @elseif(\Illuminate\Support\Facades\Auth::user()->hasRole(\App\Models\User::ROLES['teacher']))
            <li class="list-group-item"><a href="{{route('school.index')}}">{{__('other.Schools')}}</a></li>
            <li class="list-group-item"><a href="{{route('timetables.index',['teacher' => Auth::user()->id])}}">{{__('other.Timetables')}}</a></li>
            <li class="list-group-item"><a href="{{route('communications.invitation.index',['teacher' => Auth::user()->id])}}">{{__('other.Invitations')}}</a></li>
        @elseif(\Illuminate\Support\Facades\Auth::user()->hasRole(\App\Models\User::ROLES['user']))
            <li class="list-group-item"><a href="{{route('school.index')}}">{{__('other.Schools')}}</a></li>
            <li class="list-group-item"><a href="{{route('user.subscription.index',['user' => Auth::user()])}}">{{__('other.Subscriptions')}}</a></li>
            <li class="list-group-item"><a href="{{route('cabinet.people.index')}}">{{__('other.People')}}</a></li>
        @endif
        <li class="list-group-item"><a href="{{route('cabinet.user.settings',['user'=> Auth::user()])}}">{{__('other.Settings')}}</a></li>
        <li class="list-group-item">
            <form method="POST" action="{{route('logout')}}">
                @csrf
                <button class="btn">{{__('other.Logout')}}</button>
            </form>
        </li>
    </ul>
</div>
