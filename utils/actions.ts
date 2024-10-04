'use server'
import { prisma } from '@/prisma/db'
import { users } from '@/prisma/users'
import { z } from 'zod'

export async function getPosts(pageParam = 0) {
   await new Promise((resolve) => setTimeout(resolve, 1500))
   let limit = 20
   const take = limit
   const skip = (pageParam - 1) * limit
   const posts = await prisma.user.findMany({
      select: {
         full_name: true,
         id: true,
      },
      take,
      skip,
      orderBy: {
         id: 'asc',
      },
   })

   const totalPosts = await prisma.user.count()
   const totalPages = Math.ceil(totalPosts / limit)
   return {
      posts,
      total: totalPosts,
      next: pageParam < totalPages ? pageParam + 1 : undefined,
      previous: pageParam > 1 ? pageParam - 1 : undefined,
   }
}

export async function getComments() {
   await new Promise((resolve) => setTimeout(resolve, 3000))
   const response = await fetch(process.env.API_URL as string, { cache: 'no-cache' })
   const data = await response.json()
   return data.data
}

export async function createPost(title: string) {
   await new Promise((resolve) => setTimeout(resolve, 1000))
   try {
      const data = await prisma.form.create({
         data: { title },
      })
      return {
         id: data.id,
         title: data.title,
      }
   } catch (error) {
      console.log(error)
   }
}

const schema = z.object({
   full_name: z.string().min(3, { message: 'Title must have at least 3 characters' }).max(10, { message: 'Title must have at most 10 charactares' }),
   number: z.number().min(4, { message: 'Number must be equal to or greather than 4' }),
})
export async function createPostWithZod(full_name: string) {
   const result = schema.safeParse({ full_name, number: 4 })

   if (!result.success) {
      return result.error.errors.map((e) => e.message)
   } else {
      const data = await prisma.user.create({
         data: { full_name },
      })
      return `Your id is ${data.id}`
   }
}
export async function createManyUsers() {
   try {
      await prisma.user.createMany({
         data: users,
      })
   } catch (error) {
      console.log(error)
   }
}
