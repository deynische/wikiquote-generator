# Wikiquote Generator

A project to learn how to use [React](https://reactjs.org/).

Uses MediaWiki API to query a random quote from https://en.wikiquote.org/ and render it to the page.

## Roadmap
* Add ability to share quote to social media
* Display the Quote of the Day
* User search to return list of quotes from first page result
* User search to return list of page results that goto their list of quotes
* Rebuild in [React Native](https://facebook.github.io/react-native/)

### To Do
- [ ] refactor parse call for the following scenarios:
  - [ ] page contents not in section index 1
  - [ ] page quotes not in expected html format
- [ ] render without using `dangerouslySetInnerHTML`
- [ ] basic styling