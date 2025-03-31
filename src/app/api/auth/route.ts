import { getUserInfo } from '@/utils/supabase/actions'

export async function GET() {
  const user = await getUserInfo()
  return Response.json(user)
}
