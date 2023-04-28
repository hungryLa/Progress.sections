<div class="mb-3">
    <label class="form-label" for="{{$name}}">{{$label}}</label>
    <select class="form-select @error($name) is-invalid @enderror" id="{{$name}}" name="{{$name}}" {{$disabled}}>
        <option selected value="{{null}}">{{$defaultValue}}</option>
        {{$slot}}
    </select>
    @error($name)
    <span class="text-danger small">{{$message}}</span>
    @enderror
</div>
