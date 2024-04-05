import "../styles/globals.css"
import {Roboto} from '@next/font/google'
import { Amplify } from "aws-amplify"

// Dynamically generate the configuration
const awsConfig = {
  aws_project_region: "eu-north-1",
  aws_appsync_graphqlEndpoint: process.env.NEXT_PUBLIC_AWS_APPSYNC_GRAPHQLENDPOINT,
  aws_appsync_region: process.env.NEXT_PUBLIC_AWS_APPSYNC_REGION,
  aws_appsync_authenticationType: "API_KEY",
  aws_appsync_apiKey: process.env.NEXT_PUBLIC_AWS_APIKEY,
  aws_cognito_identity_pool_id: process.env.NEXT_PUBLIC_AWS_COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: "eu-north-1",
  aws_user_pools_id: process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID,
  oauth: {}, 
  aws_cognito_username_attributes: [
    "EMAIL"
  ],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: [
    "EMAIL"
  ],
  aws_cognito_mfa_configuration: "OFF",
  aws_cognito_mfa_types: [
    "SMS"
  ],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: []
  },
  aws_cognito_verification_mechanisms: [
    "EMAIL"
  ],
  aws_user_files_s3_bucket: "greencubesimagesrepo72930-dev",
  aws_user_files_s3_bucket_region: "eu-north-1"
};

Amplify.configure(awsConfig);


const roboto = Roboto({
  subsets:  ['latin'], 
  weight: ['100','300','400','500','900','700']
})

function MyApp({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
    <Component {...pageProps} />
    </main>
  )
}

export default MyApp
