<form action="{{$action}}" method="POST" enctype="multipart/form-data">
    <div class="mb-3">
        @csrf
        <input type="file" class="form-control @error(str_replace('[]','',$name)) is-invalid @enderror @error(str_replace('[]','.*',$name)) is-invalid @enderror" id="{{$name}}" name="{{$name}}" {{$multiple}}>
        @error('files')
        <span class="text-danger small">{{$message}}</span>
        @enderror
        @error(str_replace('[]','.*',$name))
        <span class="text-danger small">{{$message}}</span>
        @enderror
    </div>
    <button class="btn btn-success">{{$label}}</button>
</form>
