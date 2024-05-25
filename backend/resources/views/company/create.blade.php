<!DOCTYPE html>
<html>
<head>
    <title>Create Company</title>
</head>
<body>
    <h1>Create Company</h1>
    <form action="{{route('company.store')}}" method="post">
        @csrf
        @method('POST')

        <label for="name">Company Name:</label><br>
        <input type="text" id="name" name="name"><br>
        <label for="email">Company Website:</label><br>
        <input type="text" id="website" name="website"><br>
        <label for="logo">Company Logo:</label><br>
        <input type="file" id="logo" name="logo"><br>
        {{-- <label for="logo">Company Cover Image:</label><br>
        <input type="file" id="cover" name="cover"><br> --}}
        <label for="description">Company Description<label><br>
        <input type="text" id="description" name="description"><br>
        <input type="submit" value="Create Company">
    </form>
</body>
</html>