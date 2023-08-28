"""empty message

Revision ID: fdf4efb16830
Revises: 8298bfce1dd8
Create Date: 2023-08-24 12:37:26.695409

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fdf4efb16830'
down_revision = '8298bfce1dd8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('title', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('description', sa.String(), nullable=False))
        batch_op.drop_column('content')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('content', sa.VARCHAR(), nullable=False))
        batch_op.drop_column('description')
        batch_op.drop_column('title')

    # ### end Alembic commands ###
