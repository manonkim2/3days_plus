interface IBadgeProps {
  text: string
}

const Badge = ({ text }: IBadgeProps) => {
  return (
    <div className="text-sm bg-black text-white rounded-3xl py-xs px-md">
      {text}
    </div>
  )
}

export default Badge
