# ReportEase: Injury Tracking System

ReportEase is a comprehensive injury tracking system designed to simplify injury reporting and management. Once users sign up, they can create detailed injury reports, providing essential information about their injuries. One of the standout features allows users to attach images and pinpoint specific regions of their injury. Additionally, users can provide descriptions for each marked region, enhancing the depth of their injury reports.

## Key Features:

- **Authentication:** Users can signup/login using email-password or using googleLogin.

- **Responsiveness:** This is application is fully responsive and works well on all kind of devices.

- **Injury Reporting:** Users can create detailed injury reports post signup giving details like reporter name and time of the injury.

- **Image Upload:** Users can attach images related to their injuries, providing visual context for each report.

- **Region Marking:** A unique feature allows users to pinpoint specific regions on the images to highlight the exact location of the injury.

- **Description:** Users can add descriptions to each marked region, providing additional context and information.

- **Report Management:** Users have access to a dedicated dashboard where they can view and manage all their injury reports.

- **Sorting:** Reports can be sorted based on two criteria(newest first, oldest first) to help users quickly find the information they need.

- **Search Functionality:** Users can easily search for reports based on keywords in the report name or description.


## Screenshots:

<div align="center">
  <img src="https://github.com/vishalchaurasia10/Injury-Tracking-System/assets/105992958/df884526-8dc9-4014-ab33-5e0bf4366ef6" width="45%"/>
  <img src="https://github.com/vishalchaurasia10/Injury-Tracking-System/assets/105992958/055a7587-7cfb-4b38-8fe5-ae31c4076fca" width="45%"/>
</div>

<div align="center">
  <img src="https://github.com/vishalchaurasia10/Injury-Tracking-System/assets/105992958/40f4e554-3158-4a20-aa16-b1349a4065dc" width="45%"/>
  <img src="https://github.com/vishalchaurasia10/Injury-Tracking-System/assets/105992958/2c31a3a0-4660-434a-b927-7d3469401933" width="45%"/>
</div>

<div align="center">
  <img src="https://github.com/vishalchaurasia10/Injury-Tracking-System/assets/105992958/c9f7c6ef-64b1-4904-b5cf-24ae9468847b" width="45%"/>
  <img src="https://github.com/vishalchaurasia10/Injury-Tracking-System/assets/105992958/35300bb5-8358-4e03-835d-3d58cfb12e10" width="45%"/>
</div>

## Folder Structure

All the main files are contained in the `src` folder, which contains 5 subfolders:

- `components`: This folder contains 3 subfolders for different types of components.
  - `authentication`: Contains components related to authentication, including `signin`, `signup`, `verification`, and `forgotpassword`.
  - `elements`:
    - **uploads**: This is the component for uploading reports.
    - **annotate**: This is the component for marking injury regions on images.
    - **reports**: This is the component for displaying and managing user reports, allowing users to delete, update, and view specific reports.
  - `layout`:
    - **Navbar**: This component displays the navigation menu for the application.
    - **Sidebar**: This component shows the sidebar for the application on small screens.

- `context`: This folder is used for state management via the context API and contains:
  - `auth context`: Manages all authentication-related functionality, including login, logout, verification, and password reset.
  - `report context`: Manages file uploads, deletions, updates, and fetching of all user reports.

- `pages`: This folder contains various pages included in the application.

- `styles`: Contains styling for the application, implemented using Tailwind CSS.

- `utils`: This folder contains utilities, such as constants, common functions, and fonts used throughout the application.

## TechStack used:

- **Frontend:** NextJs is used for the frontend.

- **Backend:** Appwrite cloud is used for the backend and database.

- **Authentication:** OAuth2.0 provided by appwrite is used for google authentication and appwrite authentication is used for email authentication

- **State Mangement:** Context API is used for managing the states throughout the application.

## Usage:

1. **Sign Up**:
   - Visit the [ReportEase App](https://report-ease.vercel.app/).
   - Sign up for an account using either your email and password or Google authentication.
   - If you choose email and password, verify your email by clicking the verification link sent to your inbox.
   - After verification, log in to your account.

2. **Create an Injury Report**:
   - Upon successful login, you'll be directed to the home page.
   - Fill out the injury report form with details such as reporter name and injury timestamp.

3. **Attach Images**:
   - You can upload multiple images related to the injury.
   - After selecting images, you'll see a pen icon at the bottom of each image. Use this pen icon to mark different regions on the image.

4. **Add Descriptions**:
   - For each marked region, provide descriptions to offer additional context and information about the injury.

5. **Upload the Report**:
   - Once you've completed the annotation, upload the injury report.

6. **View Reports**:
   - Navigate to the Reports page to view a list of all your uploaded reports.
   - Each report has the following options:
     - A trash icon to delete the report.
     - A pen icon to edit the report.
     - A "View Report" button to view the full details of the report.
