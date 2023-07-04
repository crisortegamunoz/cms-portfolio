import Swal from 'sweetalert2'

export class SwalConfig {

  public static simpleModalSuccess(title: string, message: string) {
    Swal.fire(
      title,
      message,
      'success'
    )
  }

  public static simpleModalError(title: string, message: string) {
    Swal.fire(
      title,
      message,
      'error'
    )
  }

  public static simpleModalWarning(title: string, message: string) {
    Swal.fire(
      title,
      message,
      'warning'
    )
  }

  public static successMessage(message: string): void {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: true,
      timer: 4500
    })
  }

  public static deleteMessage(): Promise<any> {
    return Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás recuperar este registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borralo!'
    })
  }

}
