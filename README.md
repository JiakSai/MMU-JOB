# About MMU JOB

MMU JOB is a web application built using Laravel 11 and React.js. It has three main user roles: jobseeker, employer, and admin. Each role has its own set of permissions and functionalities.

## Installations

1. **Clone the repository**:
   ```
   git clone https://github.com/JiakSai/MMU-JOB.git
   ```

2. **Set the basic config**:
   - Rename `.env.example` to `.env`.
   - Update the database connection details in the `.env` file:
     ```
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=mmu_job
     DB_USERNAME=your_username
     DB_PASSWORD=your_password
     ```
   - Configure the email settings:
     ```
     MAIL_MAILER=smtp
     MAIL_HOST=smtp.gmail.com
     MAIL_PORT=587
     MAIL_USERNAME=your_email@example.com
     MAIL_PASSWORD=your_email_password
     MAIL_ENCRYPTION=tls
     MAIL_FROM_ADDRESS="your_email@example.com"
     MAIL_FROM_NAME="MMU JOB"
     ```

3. **Install Dependencies**:
   ```
   composer install
   npm install
   ```

4. **Migrate Database and Seed Data**:
   ```
   php artisan migrate:fresh
   php artisan db:seed
   ```

5. **Serve the application**:
   ```
   npm run dev
   php artisan serve
   ```

The application should now be running at `http://localhost:8000`.

## Contributing

If you would like to contribute to the development of MMU JOB, please follow the standard GitHub workflow:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them
4. Push your branch to your forked repository
5. Submit a pull request to the original repository

Please ensure that your code follows the project's coding standards and includes appropriate tests.
