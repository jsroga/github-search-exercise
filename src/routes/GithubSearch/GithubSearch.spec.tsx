import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { GithubSearch } from './GithubSearch';
import configureStore from 'redux-mock-store';
import {initialState} from '../../store/githubSearch/reducer'
import { UserDetails } from '../../components/UserDetails/UserDetails';

const mockStore = configureStore([]);

const prepareComponent = (state = {}, props = {}) => {
  const store = mockStore({
    githubSearch: {...initialState, ...state}
  })
  return renderer.create(
    <Provider store={store}>
      <GithubSearch {...props} />
    </Provider>
  )
}

describe('<GithubSearch />', () => {
  it('renders without error', async () => {
    const {root} = prepareComponent()
    expect(root).toBeDefined();
  })

  it('renders UserDetails without error', async () => {
    const user = {
      name: 'foo',
      bio: 'bar',
      avatarUrl: 'https://placekitten.com/408/287',
      login: 'foobar'
    }
    const {root} = prepareComponent({
      selectedUser: user
    })
    const userDetails = root.findByType(UserDetails)
    expect(userDetails).toBeDefined();
    expect(userDetails.props).toEqual(user);
  })

  it('renders UserDetails error', async () => {
    const {root} = prepareComponent({
      error: 'houston we have a problem'
    })
    const error = root.findByProps({className: 'pw-github-search__error'})
    expect(error).toBeDefined();
    expect(error.props.children).toEqual('houston we have a problem');
  })

  it('renders repos Card', async () => {
    const {root} = prepareComponent({
      selectedUserRepos: [
        {id: '1', name: 'jquery'},
        {id: '2', name: 'react'},
        {id: '3', name: 'angular'},
      ]
    })
    const repos = root.findAllByProps({className: 'pw-github-search__repo'})
    expect(repos.length).toEqual(3);
  })
})
