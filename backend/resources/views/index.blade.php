<!DOCTYPE html>
<html>
<head>
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card">
                    <div class="card-header">Welcome</div>

                    <div class="card-body">
                        <h1>Welcome to the Index Page</h1>
                        <p>This is the content of the index page.</p>
                        <p>hello</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Website</th>
                <th>Logo</th>
                <th>Cover</th>
                <th>Description</th>
                
            </tr>
        </thead>
        <tbody>
            {{-- @foreach($companies as $company)
                <tr>
                    <td>{{ $company->name }}</td>
                    <td><a href="{{ $company->website }}">{{ $company->website }}</a></td>
                    <td>
                        <img src="{{ url('/') }}/images/company/{{ $company->logo }}" alt="{{ $company->name }} logo">
                    </td>
                    <td>
                        <img src="{{ url('/') }}/images/company/{{ $company->logo }}" alt="{{ $company->name }} logo">
                    </td>
                    <td>{{ $company->description }}</td>
                </tr>
            @endforeach --}}
        </tbody>
    </table>

</body>
</html>