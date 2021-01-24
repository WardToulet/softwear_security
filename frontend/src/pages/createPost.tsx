import React, { FC } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';

const CreatePost: FC = () => {
  const { handleSubmit, control, errors } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="column"
        spacing={2}
      >
        <Grid item>
          <Controller
            name="title"i
            control={control}
            render={({ onChange, value }) => 
              <TextField 
                onChange={onChange} 
                value={value}
                label="Title"
                error={errors.title != null}
                helperText={errors.title?.message}
                fullWidth
              />
            }
            defaultValue=""
            rules={{ required: "You must enter a title" }}
          />
        </Grid>

        <Grid item>
          <Controller
            name="link"
            control={control}
            render={({ onChange, value }) => 
              <TextField 
                fullWidth
                onChange={onChange} 
                value={value}
                label="Link"
                error={errors.link != null}
                helperText={errors.link?.message}
              />
            }
            defaultValue=""
            rules={{ required: "You must enter a link" }}
          />
        </Grid>

        <Grid item>
          <Controller
            name="description"
            control={control}
            render={({ onChange, value }) => 
              <TextField 
                multiline
                rowsMax={4}
                fullWidth
                onChange={onChange} 
                value={value}
                label="Description"
                error={errors.description != null}
                helperText={errors.description?.message}
              />
            }
            defaultValue=""
            rules={{ required: "You must enter a description" }}
          />
        </Grid>

        <Grid item>
          <Button 
            type="submit"
            variant="contained"
            color="primary"
          >
            Post
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default CreatePost;
