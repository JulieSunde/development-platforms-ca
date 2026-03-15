# development-platforms-ca

This project is a simple News website where users can register, log in, view articles, and create articles. Only users who are logged in are able to create articles and edit or delete their own articles. The project uses Supabase for authentication and database storage and is built with HTML, CSS and vanilla JavaScript.

## Installation and Setup

To run the project locally:

1. Clone the repository

git clone https://github.com/JulieSunde/development-platforms-ca.git

2. Open the project folder

cd development-platforms-ca

3. Open the project in a code editor (I used VS Code).

4. Configure Supabase:

Create a new Supabase project at supabase.com

Copy your project URL and anon key.

In js/supabase.js, replace the placeholders:

const supabaseUrl = "YOUR_SUPABASE_URL";
const supabaseKey = "YOUR_SUPABASE_ANON_KEY";
export const supabase = createClient(supabaseUrl, supabaseKey);

Run the project locally with a development server such as VS Code or Live Server.

- Supabase Table (articles) and Policies

    - id (uuid, primary key)

    - title (text, required)

    - category (text, optional)

    - content (text, required)

    - user_id (uuid, references auth.users)

    - created_at (timestamp, default now())

- Row-Level Security (RLS) Policies implemented:

    - Anyone can read articles, public - All users can view articles
    - Users can create articles, authenticated - Only logged-in users can insert articles
	- Users can delete their own articles, authenticated - Users can delete only articles they created
    - Users can update their own articles, authenticated - Users can edit only their own articles

These policies ensure only the author of a post can modify it, while everyone can read articles.

Make sure the Supabase configuration in `supabase.js` contains your own project URL and API key.

Example:

const supabaseUrl = "YOUR_SUPABASE_URL"
const supabaseKey = "YOUR_SUPABASE_ANON_KEY"

Run the project using a local development server, for example with the VS Code Live Server extension or another local server.

Then open the website in the browser.

## Project Functionality

- User registration
- User login
- Article listing on the homepage (index.html)
- Creating articles (only for logged in users)
- Editing your own articles
- Deleting your own articles
- Responsive layout

- Supabase is used for:
    - Authentication
    - Database storage
    - Row Level Security policies

## Repository includes

- HTML pages
- CSS styling
- JavaScript functionality
- Supabase configuration

## Motivation for the project

I chose Option 2 (Frontend with Supabase) because I wanted to practice building a small full stack style application without having to create my own backend server. Using Supabase made it possible to focus more on the frontend logic and user interface. I also wanted to work more with Supabase to understand it better.

During development I enjoyed working with the configuration in Supabase. It was interesting to see how changes made in the application were stored quickly in the database and then displayed again in the frontend.

One challenge during the project was understanding Row Level Security policies in Supabase. It took some time to understand how permissions control who can read, update or delete articles. At first I thought everything was configured correctly, but when the code could not send the updated information to Supabase I realized that I had forgotten to add the policy that allows users to update their own articles. Debugging authentication and database permissions was therefore sometimes difficult.

A benefit of using a service like Supabase is that everything is available in one place: authentication, database hosting and API access. This makes development faster and simpler compared to building a custom backend API from scratch.

Overall the project gave me a lot of learning. It helped me understand how frontend applications communicate with backend services and how authentication and database security work. I am glad I chose this assignment option because it helped me explore Supabase more deeply.

## AI Usage

AI tools were used during the development process for:

- Explaining Supabase concepts
- Understanding error messages
- Suggestions for small features like editing and deleting articles
- Documentation suggestions