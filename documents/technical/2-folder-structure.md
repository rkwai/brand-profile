# Project Folder Structure

```
/project-root
├── package.json
├── yarn.lock or package-lock.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
├── jest.config.js
├── .eslintrc.js
├── .gitignore
├── README.md
├── public/
│   ├── favicon.ico
│   ├── images/
│   └── ...
├── src/
│   ├── index.tsx
│   ├── pages/
│   │   ├── _app.tsx
│   │   ├── index.tsx
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   ├── dashboard.tsx
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── login.ts
│   │       │   └── signup.ts
│   │       ├── generateVoiceProfile.ts
│   │       ├── generatePost.ts
│   │       └── updateProfile.ts
│   ├── components/
│   │   ├── Common/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── Onboarding/
│   │   │   └── Onboarding.tsx
│   │   ├── ContentPillars/
│   │   │   └── ContentPillars.tsx
│   │   ├── UVP/
│   │   │   └── UVP.tsx
│   │   ├── VoiceProfile/
│   │   │   ├── GenerateVoiceProfile.tsx
│   │   │   └── ReviewEditVoiceProfile.tsx
│   │   ├── Notes/
│   │   │   └── InputNotes.tsx
│   │   ├── PostGeneration/
│   │   │   ├── GeneratePost.tsx
│   │   │   └── ReviewEditPost.tsx
│   │   ├── Confirmation/
│   │   │   └── Confirmation.tsx
│   │   └── EditOptions/
│   │       └── EditOptions.tsx
│   ├── styles/
│   │   ├── globals.css
│   │   └── tailwind.css
│   ├── utils/
│   │   ├── api.ts
│   │   ├── constants.ts
│   │   └── helpers.ts
│   ├── services/
│   │   ├── supabaseClient.ts
│   │   ├── supabaseAuth.ts
│   │   └── anthropicClient.ts
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useFetch.ts
│   │   └── useSupabase.ts
│   └── tests/
│       ├── components/
│       ├── pages/
│       └── utils/
```

## Explanation of the Folder Structure

### `/project-root`

- **package.json**: Lists project dependencies and scripts.
- **yarn.lock** or **package-lock.json**: Locks the versions of dependencies.
- **tsconfig.json**: TypeScript configuration file.
- **tailwind.config.js**: Configuration file for Tailwind CSS.
- **postcss.config.js**: Configuration for PostCSS, used by Tailwind CSS.
- **vercel.json**: Vercel deployment configurations.
- **jest.config.js**: Configuration for Jest testing framework.
- **.eslintrc.js**: Configuration for ESLint to enforce code quality.
- **.gitignore**: Specifies intentionally untracked files to ignore.
- **README.md**: Project documentation.

### `/public/`

- Contains public assets accessible by the browser.
- **favicon.ico**: Favicon for the app.
- **images/**: Folder for static images.

### `/src/`

Main source code directory.

#### `/src/index.tsx`

- Entry point of the React application.

#### `/src/pages/`

- Contains Next.js page components.
- **\_app.tsx**: Custom App component to initialize pages.
- **index.tsx**: Home page component.
- **login.tsx**, **signup.tsx**, **dashboard.tsx**: Other page components.
- **api/**: Contains API routes.
  - **auth/**: Authentication API routes.
    - **login.ts**, **signup.ts**
  - **generateVoiceProfile.ts**: API route to generate voice profiles.
  - **generatePost.ts**: API route to generate posts.
  - **updateProfile.ts**: API route to update user profiles.

#### `/src/components/`

- Reusable components, organized by feature, using **PascalCase** naming.
- **Common/**: Shared components (e.g., `Header.tsx`, `Footer.tsx`).
- **Onboarding/**: Components for the onboarding process.
- **ContentPillars/**: Components for content pillars input.
- **UVP/**: Components for Unique Value Proposition input.
- **VoiceProfile/**: Components for voice profile generation and review.
- **Notes/**: Component for inputting notes.
- **PostGeneration/**: Components for post generation and review.
- **Confirmation/**: Component for the confirmation screen.
- **EditOptions/**: Component for editing options.

#### `/src/styles/`

- Global and component-specific styles.
- **globals.css**: Global styles.
- **tailwind.css**: Tailwind CSS imports.

#### `/src/utils/`

- Utility functions and helpers.
- **api.ts**: Functions for making API calls.
- **constants.ts**: Constant values used across the app.
- **helpers.ts**: General helper functions.

#### `/src/services/`

- Interactions with external APIs and libraries.
- **supabaseClient.ts**: Initializes the Supabase client.
- **supabaseAuth.ts**: Authentication utilities using Supabase.
- **anthropicClient.ts**: Client for interacting with the Anthropic LLM API.

#### `/src/contexts/`

- React context providers for state management.
- **AuthContext.tsx**: Provides authentication state.

#### `/src/hooks/`

- Custom React hooks.
- **useAuth.ts**: Hook for authentication logic.
- **useFetch.ts**: Hook for data fetching.
- **useSupabase.ts**: Hook for Supabase interactions.

#### `/src/tests/`

- Contains test files for components, pages, and utilities.

## Alignment with the Specified Rules

### Rule 1: Project Structure

- **Project Structure Defined**: The structure includes `src/`, `components/`, `pages/`, `styles/`, `utils/`, and `services/` as specified.
- **Consistency**: Maintains a consistent and organized codebase.

### Rule 2: Use of TypeScript

- **TypeScript Enforced**: All files use `.tsx` or `.ts` extensions.
- **Configuration**: `tsconfig.json` is included for TypeScript setup.

### Rule 3: Component Naming Convention

- **PascalCase**: All components are named using PascalCase (e.g., `MyComponent.tsx`).
- **Consistency**: Follows the naming convention throughout the `components/` directory.

### Rule 4: Tailwind CSS Usage

- **Tailwind CSS Enabled**: Configured with `tailwind.config.js` and `postcss.config.js`.
- **Guidelines Followed**:
  - **Utility-First Classes**: Styling uses Tailwind's utility classes.
  - **No Inline Styles**: Avoids the use of inline styles for consistency and maintainability.

### Rule 5: API Interaction with Supabase

- **Async/Await**: Supabase interactions use `async/await`.
- **Error Handling**: Implements `try/catch` blocks for error handling.
- **Encapsulated Logic**: Supabase interactions are encapsulated in the `services/` directory.

### Rule 6: State Management with React Context

- **React Context**: Global state is managed using React Context API.
- **Context Providers**: Located in the `contexts/` directory.

### Rule 7: Code Comments and Documentation

- **Comments Required**: Encouraged to include comments and documentation.
- **JSDoc Format**: Recommended for function and component documentation.

### Rule 8: Testing Guidelines

- **Jest Framework**: Set up as the testing framework with `jest.config.js`.
- **Coverage Thresholds**: Can be configured as per the guidelines (80% coverage).
- **Test Directory**: Tests are organized under `src/tests/`.

### Rule 9: Version Control Practices

- **.gitignore**: Included to specify untracked files.
- **Commit Messages**: Follow the format `feat|fix|docs|style|refactor|test|chore: [description]`.

## Example of an API Route with Supabase Interaction

```typescript
// src/pages/api/generateVoiceProfile.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getSupabaseClient } from '../../services/supabaseClient';
import { generateVoiceProfile } from '../../services/anthropicClient';

/**
 * API Route to generate a voice profile using user inputs.
 *
 * @param req - Next.js API request object.
 * @param res - Next.js API response object.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { contentPillars, uvp, userId } = req.body;
    const supabase = getSupabaseClient();

    // Generate voice profile using Anthropic LLM
    const voiceProfile = await generateVoiceProfile(contentPillars, uvp);

    // Save to Supabase
    const { data, error } = await supabase
      .from('voice_profiles')
      .insert([{ user_id: userId, profile: voiceProfile }]);

    if (error) throw error;

    res.status(200).json({ voiceProfile: data });
  } catch (error) {
    console.error('Error generating voice profile:', error);
    res.status(500).json({ error: error.message });
  }
};
```

- **TypeScript Used**: Ensures type safety with proper type annotations.
- **Async/Await and Try/Catch**: Implements async operations with error handling as per Rule 5.
- **JSDoc Comments**: Includes comments in JSDoc format for documentation.

## Final Thoughts

This updated folder structure and project setup align with the rules specified in your `.cursorrules` file, ensuring best practices for a scalable and maintainable codebase. By adhering to these guidelines, the project will be:

- **Consistent**: Uniform coding standards make it easier for developers to navigate and contribute.
- **Extensible**: A well-organized structure allows for easy addition of new features.
- **Maintainable**: Clear separation of concerns and proper documentation aid in long-term maintenance.

Feel free to adjust or expand upon this structure to better suit the specific needs of your project. If you have any questions or need further assistance, don't hesitate to ask!