import React, { FC } from 'react';
import { Link, Card, CardContent, Typography, CardActions } from '@material-ui/core';

type ArticleProps = {
  title: string,
  user: string,
  link: string,
  description: string,
}

const Article: FC<ArticleProps> = ({
  title,
  user,
  link,
  description,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">
          { title }
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          { user }
        </Typography>
        <Typography>
          { description }
        </Typography>
      </CardContent> 
      <CardActions>
        <Link href={link}>Link</Link>
      </CardActions>
    </Card>
  );
}

export default Article;
