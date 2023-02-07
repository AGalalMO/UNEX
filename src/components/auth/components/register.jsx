import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { TabPanel } from 'react-tabs';
import { StyledButton, StyledRegionSelect, StyledTextFiled } from './styles';

function Register ({ registerForm }) {
    const {locale}=useRouter()
    return (
      <form onSubmit={registerForm.handleSubmit}>
        <Stack spacing={4}>
          <StyledTextFiled
            fullWidth
            id='name'
            name='name'
            label={locale == "en" ? "name" : "الاسم"}
            variant='filled'
            value={registerForm.values.name}
            onChange={registerForm.handleChange}
            InputProps={{ disableUnderline: true, style: { fontSize: "14px" } }}
            InputLabelProps={{ style: { fontSize: "14px" } }} // font size of input label
            error={
              registerForm.touched.name && Boolean(registerForm.errors.name)
            }
            helperText={registerForm.touched.name && registerForm.errors.name}
          />
          <StyledTextFiled
            fullWidth
            id='email'
            name='email'
            label={locale == "en" ? "Email" : "البريد الالكتروني"}
            variant='filled'
            value={registerForm.values.email}
            onChange={registerForm.handleChange}
            InputProps={{ disableUnderline: true, style: { fontSize: "14px" } }}
            InputLabelProps={{ style: { fontSize: "14px" } }} // font size of input label
            error={
              registerForm.touched.email && Boolean(registerForm.errors.email)
            }
            helperText={registerForm.touched.email && registerForm.errors.email}
          />
          <StyledTextFiled
            fullWidth
            id='phoneNumber'
            name='phoneNumber'
            label={locale == "en" ? "Phone Number" : "رقم الموبايل"}
            variant='filled'
            value={registerForm.values.phoneNumber}
            onChange={registerForm.handleChange}
            InputProps={{ disableUnderline: true, style: { fontSize: "14px" } }}
            InputLabelProps={{ style: { fontSize: "14px" } }} // font size of input label
            error={
              registerForm.touched.phoneNumber &&
              Boolean(registerForm.errors.phoneNumber)
            }
            helperText={
              registerForm.touched.phoneNumber &&
              registerForm.errors.phoneNumber
            }
          />

          <StyledTextFiled
            fullWidth
            id='address'
            name='address'
            label={locale == "en" ? "Address" : " العنوان بالتفصيل"}
            variant='filled'
            value={registerForm.values.address}
            onChange={registerForm.handleChange}
            InputProps={{ disableUnderline: true, style: { fontSize: "14px" } }}
            InputLabelProps={{ style: { fontSize: "14px" } }} // font size of input label
            error={
              registerForm.touched.address &&
              Boolean(registerForm.errors.address)
            }
            helperText={
              registerForm.touched.address && registerForm.errors.address
            }
          />
          <StyledTextFiled
            fullWidth
            id='password'
            name='password'
            label={locale == "en" ? "Password" : "كلمة السر"}
            variant='filled'
            type='password'
            value={registerForm.values.password}
            onChange={registerForm.handleChange}
            error={
              registerForm.touched.password &&
              Boolean(registerForm.errors.password)
            }
            helperText={
              registerForm.touched.password && registerForm.errors.password
            }
            InputProps={{ disableUnderline: true, style: { fontSize: "14px" } }}
            InputLabelProps={{ style: { fontSize: "14px" } }} // font size of input label
          />

          <StyledButton
            sx={{ minHeight: "40px" }}
            color='error'
            variant='contained'
            type='submit'>
            {locale == "en" ? "Register" : "انشاء جديد"}
          </StyledButton>
        </Stack>
      </form>
    );
}

export default Register;