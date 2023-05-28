import { Layout } from "@/components/layouts";
import { LoadingModal } from "@/components/modals/LoadingModal";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import {
  startEmailSignIn,
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

const Auth = () => {
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
    dispatch(startEmailSignIn({ email, password }));
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
          <Spacer y={1.5} />

          <LoadingModal
            message="Iniciando sessión"
            open={authStatus === "checking"}
          />

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
            Iniciar sesión
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
            <Text>Iniciar sesión con Google</Text>
          </Button>

          <Spacer y={4} />

          <div style={{ display: "flex", margin: "auto" }}>
            <Text>¿No tienes cuenta?</Text>
            <Link
              style={{ marginLeft: "5px", color: "#0072F5" }}
              b="true"
              href="/auth/register"
            >
              Regístrate
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
