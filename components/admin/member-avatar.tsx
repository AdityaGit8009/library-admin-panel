import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function MemberAvatar({ name, src }: { name: string; src: string }) {
  const words = name.trim().split(/\s+/).filter(Boolean)
  const initials = [words[0], words.length > 1 ? words[words.length - 1] : ""]
    .map((word) => Array.from(word ?? "")[0] ?? "")
    .join("").toUpperCase()
  const showImage = src && !src.startsWith("https://api.dicebear.com/")

  return (
    <Avatar className="h-10 w-10">
      {showImage && <AvatarImage src={src} alt="" />}
      <AvatarFallback aria-hidden="true">{initials || "?"}</AvatarFallback>
    </Avatar>
  )
}
