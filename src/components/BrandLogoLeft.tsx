export const BrandLogoLeft = () => {
  return (
    <a href="/" aria-label="Home" className="ml-2 flex items-center">
      <img 
        src="/logo.png"
        alt="BIODANCE Logo"
        className="h-10 w-auto object-contain" 
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement!.innerHTML = '<span class="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">BIODANCE</span>';
        }}
      />
    </a>
  )
}