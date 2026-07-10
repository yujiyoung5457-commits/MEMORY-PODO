import { create } from 'zustand'
import {
  updatePostInFireStore,
  deletePostFromFireStore,
  addPostToFirestore,
  fetchPostsFromFirestore,
} from '../services/FirePost'

const initialPosts = [
  {
    id: 2,
    title: '두번째 글',
    writer: '관리자',
    content: '두번째 글입니다.',
  },
  {
    id: 1,
    title: 'CRUD 게시 첫번째 글',
    writer: '관리자',
    content: '첫번째 글입니다.',
  },
]
const getPostsErrorMessage = (error) => {
  if (error.code === 'permission-denied') {
    return '게시글 목록을 읽을 권한이 없습니다. Firebase rules error'
  }

  return error.message
}

const usePostStore = create((set) => ({
  posts: initialPosts,
  loading: false,
  error: '',

  //게시글 목록 최신순으로
  fetchPosts: async () => {
    set({ loading: true, error: '' })

    try {
      const posts = await fetchPostsFromFirestore()
      set({ posts, loading: false }) //posts: posts이면 그냥 posts라고 쓰는게 맞다
    } catch (error) {
      set({ error: getPostsErrorMessage(error), loading: false })
      throw error
    }
  },

  //게시글 추가
  addPost: async (newPost) => {
    set({ loading: true, error: '' })

    try {
      const aPost = await addPostToFirestore(newPost)

      set((state) => ({
        posts: [aPost, ...state.posts],
        loading: false,
      }))
    } catch (error) {
      set({ error: getPostsErrorMessage(error), loading: false })
      throw error
    }
  },

  addLocalPost: (newPost) => {
    set((state) => {
      const numericIds = state.posts
        .map((item) => Number(item.id))
        .filter((id) => Number.isFinite(id))
      const nextId = numericIds.length === 0 ? 1 : Math.max(...numericIds) + 1

      return {
        posts: [{ ...newPost, id: nextId }, ...state.posts],
      }
    })
  },

  //게시글 삭제 주석 지우지 말기
  deletePost: async (id) => {
    set({ loading: true, error: '' })

    try {
      await deletePostFromFireStore(id) //아이디 받아와야 함
      set((state) => ({
        //set((state)=>{
        // posts:state.posts.filter((item)=>item.id !===id),
        // })
        posts: state.posts.filter((item) => String(item.id) !== String(id)),
        loading: false,
      }))
    } catch (error) {
      set({ error: getPostsErrorMessage(error), loading: false })
      throw error
    }
  },
//게시글 수정
  updatePost: async (updatedPost) => {
    set({ loading: true, error: '' })
    try{
      const savePost=await updatePostInFireStore(updatedPost)
      set((state)=>({
        posts: state.posts.map((item)=>(item.id === savePost.id ? savePost : item)),
        loading: false,
      }))
    }catch(error){
      set({ error: getPostsErrorMessage(error), loading: false })
      throw error
    }
    // try {
    //   const savedPost = await updatePostInFireStore(updatedPost)

    //   set((state) => ({
    //     posts: state.posts.map((item) => {
    //       if (String(item.id) === String(savedPost.id)) {
    //         return savedPost
    //       }

    //       return item
    //     }),
    //     loading: false,
    //   }))
    // } catch (error) {
    //   set({ error: getPostsErrorMessage(error), loading: false })
    //   throw error
    // }
  },
}))

export default usePostStore
