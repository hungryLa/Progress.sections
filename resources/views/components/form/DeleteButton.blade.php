@if(Auth::user()->hasRole(\App\Models\User::ROLES['admin']) || Auth::user()->hasRole(\App\Models\User::ROLES['schools_owner']))
    <div class="mb-3" id="FormDeleteObject">
        <h2>{{__('other.Control panel')}}</h2>
        <form method="POST" action="{{$route}}">
            @csrf
            @method('DELETE')
            @if(session('deleteObject'))
                <div style="text-align: center" class = "alert alert-warning align-middle">
                    {{session('deleteObject')}}
                </div>
            @endif
            <x-form.inputText name="{{$name}}" value="{{$value}}" title="{{$title}}"
                                             placeholder="{{$placeholder}}" disabled="{{$disabled}}"/>
            <div class="d-grid gap-2">
                <button class="btn btn-danger">{{__("other.Delete")}}</button>
            </div>
        </form>
    </div>
@endif
