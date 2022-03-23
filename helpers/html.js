const printIcon = (item) => {
  switch (item) {
    case 'pemodal':
      return `
        <i class="material-icons-round">
          face_retouching_natural
        </i>
      `
    case 'sales':
      return `
        <i class="material-icons-round">
          hail
        </i>
      `
    case 'vendor':
      return `
        <i class="material-icons-round">
          handshake
        </i>
      `
    case 'pembeli':
      return `
        <i class="material-icons-round">
          add_shopping_cart
        </i>
      `
    default:
      return `
        <i class="material-icons-round">
          adb
        </i>
      `
  }
}

module.exports = {
  printIcon
}