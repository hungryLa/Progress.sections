<div class="mb-3">
    <label for="{{$name}}" class="form-label">{{$title}}</label>
    <input type="text" class="form-control @error($name) border-danger @enderror" id="{{$name}}" name="{{$name}}" value="{{$value}}" placeholder="{{$placeholder}}" {{$disabled}}>
    @error($name)
    <span class="text-danger small">{{$message}}</span>
    @enderror
</div>
