# CONTRIBUTING.md - Contribution Guidelines

## Contributing to Job Portal UI

Thank you for your interest in contributing to Job Portal UI! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and professional in all interactions.

## How to Contribute

### Reporting Bugs

Before reporting a bug, please:

1. Check if the bug has already been reported in [Issues](../../issues)
2. Check the [DOCUMENTATION.md](DOCUMENTATION.md) for known limitations
3. Gather information about the bug:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - Browser and OS version

**To report a bug:**

1. Go to [Issues](../../issues)
2. Click "New Issue"
3. Use the bug report template
4. Provide detailed information
5. Submit the issue

### Requesting Features

**Before requesting a feature:**

1. Check existing [Issues](../../issues) to avoid duplicates
2. Check [FEATURES.md](FEATURES.md) for planned features
3. Consider the scope and impact

**To request a feature:**

1. Go to [Issues](../../issues)
2. Click "New Issue"
3. Use the feature request template
4. Describe the use case and benefits
5. Provide examples or mockups if helpful

### Submitting Pull Requests

We welcome pull requests for bug fixes, features, and documentation improvements.

#### Before Starting

1. Fork the repository
2. Clone your fork locally
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Set up development environment (see [INSTALLATION.md](INSTALLATION.md))

#### During Development

1. Write clean, readable code
2. Follow the existing code style
3. Ensure ESLint passes: `npm run lint`
4. Keep commits atomic and well-documented
5. Test your changes thoroughly
6. Update documentation as needed

#### Before Submitting

1. Run linting: `npm run lint`
2. Build the project: `npm run build`
3. Test the application: `npm run dev`
4. Ensure no console errors
5. Update relevant documentation

#### Submitting the PR

1. Push your branch to your fork
2. Go to the original repository
3. Click "New Pull Request"
4. Select your branch
5. Fill in the PR template:
   - **Title** - Clear, descriptive title
   - **Description** - What changes are made and why
   - **Type** - Bug fix, feature, documentation, etc.
   - **Testing** - How to test the changes
   - **Related Issues** - Link to related issues
6. Enable "Allow edits from maintainers"
7. Submit the PR

#### PR Review Process

1. Wait for code review
2. Address reviewer comments
3. Re-request review after updates
4. Once approved, maintainers will merge

## Development Workflow

### Setting Up Your Environment

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Create a feature branch
4. Start development server: `npm run dev`

### Code Style

Follow these conventions:

#### File Naming
- Components: PascalCase (`MyComponent.jsx`)
- Utilities: camelCase (`myUtility.js`)
- Styles: Match component name (`MyComponent.css`)

#### Component Structure
- Import statements at top
- Component declaration
- Hooks and state
- Event handlers
- Return JSX
- Export statement

#### Naming Conventions
- Components: PascalCase
- Functions/variables: camelCase
- Constants: UPPER_SNAKE_CASE
- CSS classes: lowercase with hyphens

#### Comments
- Document complex logic
- Explain why, not what
- Keep comments up-to-date
- Use JSDoc for functions

### Testing Your Changes

Before submitting:

1. Test in development: `npm run dev`
2. Test the production build: `npm run build && npm run preview`
3. Test in multiple browsers
4. Test responsive design
5. Check console for errors
6. Test with different user roles

### Documentation

Update documentation for:

- New features
- Changed functionality
- New routes or pages
- Updated configurations
- Breaking changes

## Project Structure Guidelines

When adding new files:

- **Components** go in `src/components/`
- **Pages** go in `src/pages/`
- **Services** go in `src/services/`
- **Utilities** go in appropriate folders
- **Context** goes in `src/context/`

## ESLint & Code Quality

The project uses ESLint for code quality. Before committing:

```bash
npm run lint
```

Fix issues automatically where possible:

```bash
npm run lint -- --fix
```

## Commit Message Guidelines

Write clear, descriptive commit messages:

### Format
```
type(scope): subject

body (optional)

footer (optional)
```

### Types
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (not functionality)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Test additions or modifications
- `chore:` - Dependencies or tooling changes

### Examples
```
feat(auth): add social login options
fix(jobs): correct pagination bug on search
docs: update API integration guide
refactor(components): simplify JobCard component
```

## Areas for Contribution

### High Priority
- Bug fixes
- Performance improvements
- Documentation updates
- Accessibility enhancements
- Security improvements

### Medium Priority
- Feature enhancements
- Component refactoring
- Test coverage
- User experience improvements

### Low Priority
- Code style changes
- Comment updates
- Minor documentation updates

## Reporting Security Vulnerabilities

Do NOT open a public issue for security vulnerabilities. Instead:

1. Email security details to the maintainer
2. Include detailed description
3. Provide proof of concept if possible
4. Allow time for response

## Questions & Support

- **Documentation** - See [DOCUMENTATION.md](DOCUMENTATION.md)
- **Features** - See [FEATURES.md](FEATURES.md)
- **Installation** - See [INSTALLATION.md](INSTALLATION.md)
- **Issues** - Check existing [Issues](../../issues)
- **Discussions** - Use GitHub Discussions

## Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes
- GitHub contributors page

Thank you for contributing to Job Portal UI!

---

**Last Updated:** May 2026
