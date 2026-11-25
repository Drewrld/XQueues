CREATE DATABASE IF NOT EXISTS excuse_qr_db;
USE excuse_qr_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(50) NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    course_section VARCHAR(100) NULL,
    role ENUM('student', 'admin') NOT NULL DEFAULT 'student',
    status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    api_token VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE excuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    qr_token VARCHAR(100) NOT NULL UNIQUE,
    reason_category VARCHAR(100) NOT NULL,
    reason_details TEXT NOT NULL,
    date_from DATE NOT NULL,
    date_to DATE NOT NULL,
    subjects_affected VARCHAR(255) NULL,
    attachment_path VARCHAR(255) NULL,
    status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    admin_remarks TEXT NULL,
    reviewed_by INT NULL,
    reviewed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE scan_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    excuse_id INT NULL,
    qr_token VARCHAR(100) NOT NULL,
    scanned_by INT NULL,
    scan_result ENUM('valid', 'pending', 'rejected', 'invalid') NOT NULL,
    notes VARCHAR(255) NULL,
    scanned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (excuse_id) REFERENCES excuses(id) ON DELETE SET NULL,
    FOREIGN KEY (scanned_by) REFERENCES users(id) ON DELETE SET NULL
);