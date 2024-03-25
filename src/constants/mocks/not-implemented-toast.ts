import { ToastProps } from '../../stores/toast-store'

export const notImplementedToastProps: ToastProps = {
  title: 'Sin implementar',
  description: 'Esta funcionalidad aún no ha sido implementada. Disculpa las molestias.',
  showButton: false,
  buttonText: '',
  buttonAction: () => { },
  duration: 2000
}
