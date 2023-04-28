<form action="{{route('cabinet.files.deleteFilesThroughCheckBox')}}" method="POST">
    @csrf
    @method('DELETE')
    <table class="table">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">{{__('other.Position')}}</th>
            <th scope="col">{{__('other.Image')}}</th>
        </tr>
        </thead>
        <tbody>
        @foreach($images as $index=>$image)
            <tr id="a{{$index}}" model_id="{{$image->model_id}}" imgPosition="{{$image->position}}" imgId="{{$image->id}}" draggable="true" class="img-table">
                <th>
                    <input type="checkbox" class="position-relative d-inline-block"
                           name="checkbox[]"
                           id="checkbox[{{$image->id}}]" value="{{$image->id}}">
                </th>
                <th>
                    <p class="imgPositionNum">{{$image->position}}</p>
                </th>
                <th>
                    <label for="checkbox[{{$image->id}}]" class=" position-relative">
                        <img src="{{asset('storage/'.$image->path)}}" class="card-img-top"
                             width="120px"
                             height="70px" alt="...">
                    </label>
                </th>
            </tr>
        @endforeach
        </tbody>
    </table>
    <button class="btn btn-danger">{{__('other.Delete images')}}</button>
</form>
