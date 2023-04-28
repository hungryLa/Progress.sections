@if(session('success'))
    <div style="text-align: center" class = "alert alert-success align-middle">
        {{session('success')}}
    </div>
@elseif(session('warning'))
    <div style="text-align: center" class = "alert alert-warning align-middle">
        {{session('warning')}}
    </div>
@elseif(session('danger'))
    <div style="text-align: center" class ="alert alert-danger align-middle">
        {{session('danger')}}
    </div>
@endif
