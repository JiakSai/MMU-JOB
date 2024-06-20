<!DOCTYPE html>
<html>
<head>
    <title>Password Reset</title>
    <style>
        .token {
            font-size: 24px; 
        }

        p{
            font-size: 16px; 
            color:black;
        }
    </style>
</head>
<body>
    <p>Dear {{ $name }},</p>

    <p>To complete reset password process, please use <strong>6</strong> digits OTP code provided as below.</p>

    <p>Valid <strong>10</strong> minutes until <strong>{{ $validUntil }}.</strong></p>

    <p class="token"><strong>{{ $token }}</strong></p>

    <p>Thank you.</p>
</body>
</html>