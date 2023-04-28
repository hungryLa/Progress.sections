<div class="mb-3">
    <label for="{{$name}}" class="form-label">{{$title}}</label>
    <input type="file" class="form-control @error(str_replace('[]','.*',$name)) is-invalid @enderror" id="{{$name}}" name="{{$name}}" {{$multiple}}>
    @error(str_replace('[]','.*',$name))
    <span class="text-danger small">{{$message}}</span>
    @enderror
</div>
