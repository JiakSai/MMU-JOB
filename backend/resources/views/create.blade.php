<div>
    <h1>Add New Job Category</h1>

    <form action="{{route('jobcategory.store')}}" method="POST">
        @csrf
        @method('POST')

        <label for="name">Category Name:</label>
        <input type="text" id="name" name="name" required>

        <input type="submit" value="Add Category">
    </form>
</div>
