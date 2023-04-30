<div class="mb-3">
    <label for="{{$name}}" class="form-label">{{$title}}</label>
    <textarea class="form-control @error($name) border-danger @enderror" id="{{$name}}" name="{{$name}}" placeholder="{{$placeholder}}" rows="3" {{$disabled}}>{{$value}}</textarea>
    @error($name)
    <span class="text-danger small">{{$message}}</span>
    @enderror
</div>
