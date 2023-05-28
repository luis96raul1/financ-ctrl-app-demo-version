import { Layout } from "@/components/layouts";
import { LoadingModal } from "@/components/modals/LoadingModal";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import {
  startCreatingUserWithEmailPassword,
  startGoogleSignIn,
} from "@/redux/slices/auth/thunks";
import { IsLoggedStatus } from "@/utils/Constants";
import { Button, Input, Spacer, Text } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const router = useRouter();

  const { authStatus } = useCheckAuth();

  useEffect(() => {
    if (authStatus === IsLoggedStatus) router.push("/");
  }, [authStatus, router]);

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  const onSubmit = ({ email, password }) => {
    dispatch(startCreatingUserWithEmailPassword({ email, password }));
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <Layout navbar={false}>
      <div style={{ marginTop: "50px", width: "100%" }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            margin: "auto",
            flexDirection: "column",
            maxWidth: "400px",
          }}
        >
          <Input
            bordered
            aria-labelledby="firstName"
            labelPlaceholder="Nombres"
            status={errors.firstName ? "error" : null}
            {...register("firstName", {
              required: true,
              maxLength: 80,
              minLength: 1,
            })}
          />
          <Spacer y={1.5} />

          <LoadingModal
            message="Creando cuenta"
            open={authStatus === "checking"}
          />

          <Input
            bordered
            aria-labelledby="lastName"
            labelPlaceholder="Apellidos"
            status={errors.lastName ? "error" : null}
            {...register("lastName", { required: true, maxLength: 100 })}
          />
          <Spacer y={1.5} />

          <Input
            bordered
            aria-labelledby="phone"
            status={errors.phoneNumber ? "error" : null}
            labelPlaceholder="Teléfono"
            {...register("phoneNumber", {
              required: true,
              minLength: 6,
              maxLength: 12,
            })}
          />

          <Spacer y={1.5} />

          <Input
            bordered
            aria-labelledby="mail"
            labelPlaceholder="Email"
            status={errors.email ? "error" : null}
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          <Spacer y={1.5} />

          <Input.Password
            bordered
            aria-labelledby="password"
            labelPlaceholder="Contraseña"
            {...register("password", { required: true, minLength: 6 })}
            status={errors.password ? "error" : null}
          />
          <Spacer y={1} />

          <Button aria-labelledby="submit" type="submit">
            Registrarme
          </Button>
        </form>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "400px",
            margin: "auto",
          }}
        >
          <Spacer y={1} />

          <Button onPress={handleGoogleLogin} style={{ background: "gray" }}>
            <Image
              src="/icons/google.png"
              alt="google logo"
              width={20}
              height={20}
              style={{ marginRight: "15%" }}
            />
            <Text>Registrarme con Google</Text>
          </Button>

          <Spacer y={4} />

          <div style={{ display: "flex", margin: "auto" }}>
            <Text>¿Ya estás registrado?</Text>
            <Link
              style={{ marginLeft: "5px", color: "#0072F5" }}
              b
              href="/auth/login"
            >
              Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
