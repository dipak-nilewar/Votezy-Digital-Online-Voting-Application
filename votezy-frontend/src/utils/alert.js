import Swal from "sweetalert2";

export const successAlert = (message) => {
  return Swal.fire({
    icon: "success",
    title: "Success!",
    text: message,
    confirmButtonText: "OK",
    confirmButtonColor: "#2563EB",
    background: "#0B1B33",
    color: "#FFFFFF",
  });
};

export const errorAlert = (message) => {
  return Swal.fire({
    icon: "error",
    title: "Something went wrong!",
    text: message,
    confirmButtonText: "OK",
    confirmButtonColor: "#DC2626",
    background: "#0B1B33",
    color: "#FFFFFF",
  });
};

export const warningAlert = (message) => {
  return Swal.fire({
    icon: "warning",
    title: "Attention!",
    text: message,
    confirmButtonText: "OK",
    confirmButtonColor: "#D4AF37",
    background: "#0B1B33",
    color: "#FFFFFF",
  });
};

export const confirmAlert = async (message) => {
  const result = await Swal.fire({
    icon: "question",
    title: "Are you sure?",
    text: message,
    showCancelButton: true,
    confirmButtonText: "Yes, Continue",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#2563EB",
    cancelButtonColor: "#64748B",
    background: "#0B1B33",
    color: "#FFFFFF",
  });

  return result.isConfirmed;
};